import sql from "@lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const listing = JSON.parse(req.body);

  if (!listing) {
    return res.status(400).json({ message: "Missing listing" });
  }

  const { plot, location, operationType, price, beds, bathrooms, sq_meters, propertyType, town, images } = listing;
  const username = jwt.verify(req.cookies.token, process.env.JWT_SECRET).username;

  const user_id = await sql`
    SELECT id
    FROM accounts
    WHERE username = ${username}
  `;

  let columns = ['created_by_user'];
  let values = { created_by_user: user_id[0].id };

  if (plot) {
    columns.push('plot');
    values.plot = plot;
  }

  if (location) {
    columns.push('location');
    values.location = location;
  }

  if (operationType) {
    columns.push('status');
    values.status = operationType;
  }

  if (price) {
    columns.push('price');
    values.price = price;
  }

  if (beds) {
    columns.push('beds');
    values.beds = beds;
  }

  if (bathrooms) {
    columns.push('bathrooms');
    values.bathrooms = bathrooms;
  }

  if (sq_meters) {
    columns.push('sq_meters');
    values.sq_meters = sq_meters;
  }

  if (propertyType) {
    columns.push('property_type');
    values.property_type = propertyType;
  }

  if (town) {
    columns.push('town');
    values.town = town;
  }

  if (images) {
    columns.push('images');
    values.images = images;
  }

  await sql`
    INSERT INTO listings
      ${sql(values, columns)}
  `;

  return res.status(200).json({ message: "Listing added successfully" });
}