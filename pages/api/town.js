import sql from "@lib/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createTown(req, res);
    case "DELETE":
      return deleteTown(req, res);
    case "PUT":
      return updateTown(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function createTown(req, res) {
  try {
    const town = typeof req.body === "string" ? JSON.parse(req.body) : req.body
    console.log(town)

    if (!town) {
      return res.status(400).json({ message: "Missing town" });
    }

    const { townName } = town;
    console.log(townName)

    const town_id = await sql`
      SELECT id
      FROM towns
      WHERE name = ${townName}
    `;

    if (town_id.length > 0) {
      return res.status(409).json({ message: "Town already exists" });
    }

    await sql`
      INSERT INTO towns (name)
      VALUES (${townName})
    `;

    return res.status(200).json({ message: "Town created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteTown(req, res) {
  try {
    const town = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!town) {
      return res.status(400).json({ message: "Missing town" });
    }

    const { id } = town;

    const town_id = await sql`
      SELECT id
      FROM towns
      WHERE id = ${id}
    `;

    if (town_id.length === 0) {
      return res.status(404).json({ message: "Town not found" });
    }

    await sql`
      DELETE FROM towns
      WHERE id = ${id}
    `;

    return res.status(200).json({ message: "Town deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateTown(req, res) {
  try {
    const town = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!town) {
      return res.status(400).json({ message: "Missing town" });
    }

    const { id, name } = town;

    const town_id = await sql`
      SELECT id
      FROM towns
      WHERE id = ${id}
    `;

    if (town_id.length === 0) {
      return res.status(404).json({ message: "Town not found" });
    }

    await sql`
      UPDATE towns
      SET name = ${name}
      WHERE id = ${id}
    `;

    return res.status(200).json({ message: "Town updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}