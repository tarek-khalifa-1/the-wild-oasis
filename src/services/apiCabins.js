import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select("name")
    .single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createOrUpdateCabin(cabinData, id) {
  const supabaseURL = import.meta.env.VITE_SUPABASE_URL;

  // prepare image name and path
  let imageName;
  let imgPath;

  const hasNewImage = typeof cabinData.image === "object";

  if (hasNewImage) {
    imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll("/", "");
    imgPath = `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  if (!hasNewImage) {
    imgPath = cabinData.image;
  }

  // 1. Create/Update cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) {
    query = query.insert({ ...cabinData, image: imgPath });
  }

  // B) Update
  if (id) {
    query = query.update({ ...cabinData, image: imgPath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be store");
  }

  // 2. Upload image
  if (hasNewImage) {
    // Uploading image to the server
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    // 3. Delete the cabin if thwere was an error in uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(error);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created",
      );
    }
  }

  return data;
}
