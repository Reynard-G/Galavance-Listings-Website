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

  const { id, plot, location, status, price, beds, bathrooms, sq_meters, property_type, town, images } = listing;

  await sql`
    UPDATE listings
    SET plot = ${plot},
        location = ${location},
        status = ${status},
        price = ${price},
        beds = ${beds},
        bathrooms = ${bathrooms},
        sq_meters = ${sq_meters},
        property_type = ${property_type},
        town = ${town},
        images = ${images}
    WHERE id = ${id}
  `;

  return res.status(200).json({ message: "Listing updated successfully" });
}