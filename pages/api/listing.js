import sql from "@lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createListing(req, res);
    case "DELETE":
      return deleteListing(req, res);
    case "PUT":
      return updateListing(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function createListing(req, res) {
  try {
    const listing = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!listing) {
      return res.status(400).json({ message: "Missing listing" });
    }

    const { plot, location, operationType, price, description, beds, bathrooms, sq_meters, propertyType, images } = listing;
    const username = jwt.verify(req.cookies.token, process.env.JWT_SECRET).username;

    const listing_id = await sql`
      SELECT id
      FROM listings
      WHERE plot = ${plot}
    `;

    if (listing_id.length > 0) {
      return res.status(409).json({ message: "Listing with this plot already exists" });
    }

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

    if (description) {
      columns.push('description');
      values.description = description === "" ? null : description;
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

    if (images) {
      columns.push('images');
      values.images = images;
    }

    await sql`
      INSERT INTO listings
      ${sql(values, columns)}
    `;

    return res.status(200).json({ message: "Listing added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteListing(req, res) {
  try {
    const listing = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!listing) {
      return res.status(400).json({ message: "Missing listing" });
    }

    const { id } = listing;

    await sql`
      DELETE FROM listings
      WHERE id = ${id}
    `;

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateListing(req, res) {
  try {
    const listing = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!listing) {
      return res.status(400).json({ message: "Missing listing" });
    }

    if (listing.length > 1) {
      return res.status(400).json({ message: "Too many listings" });
    }

    const { id, plot, location, status, price, description, beds, bathrooms, sq_meters, property_type, images } = listing;

    await sql`
        UPDATE listings
        SET plot = ${plot},
          location = ${location},
          status = ${status},
          price = ${price},
          description = ${description === "" ? null : description},
          beds = ${beds},
          bathrooms = ${bathrooms},
          sq_meters = ${sq_meters},
          property_type = ${property_type},
          images = ${images}
        WHERE id = ${id}
      `;

    return res.status(200).json({ message: "Listing updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}