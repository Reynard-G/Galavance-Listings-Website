import sql from "@lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const listing = req.body;

  if (!listing) {
    return res.status(400).json({ message: "Missing listing" });
  }

  if (listing.length > 1) {
    return res.status(400).json({ message: "Too many listings" });
  }

  const { id } = listing;

  await sql`
    DELETE FROM listings
    WHERE id = ${id}
  `;

  return res.status(200).json({ message: "Listing deleted successfully" });
}