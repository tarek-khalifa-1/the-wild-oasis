import supabase from "./supabase";

export async function createGuest(guestData) {
  const { data, error } = await supabase
    .from("guests")
    .insert([guestData])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
