import { useState } from "react";
import { useRouter } from "next/router";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { imageLoader } from "@lib/ListingsUtils";
import AdminNavbar from "@components/AdminNavbar";
import AddTown from "@components/Forms/AddTown";
import TownDeleteButton from "@components/Buttons/TownDeleteButton";

import EditRoundedIcon from '@mui/icons-material/EditRounded';

const AdminTowns = ({ towns }) => {
  const router = useRouter();
  const [isEditLoading, setIsEditLoading] = useState({});

  return (
    <>
      <AdminNavbar />

      <Tabs fullWidth variant="bordered" className="flex w-full md:w-1/2 justify-center mx-auto p-4 mt-5">
        <Tab title="Towns">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {towns.map((town) => (
              <Card key={town.id} className="mb-4">
                <CardHeader>
                  <h1 className="text-xl font-bold">{town.name}</h1>
                </CardHeader>

                <CardBody className="flex items-center">
                  <Image
                    src={imageLoader({ src: town.icon, width: 128 })}
                    alt={town.name}
                    width={128}
                    height={128}
                    isBlurred
                    className="rounded-lg"
                  />
                </CardBody>

                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="ghost"
                    isLoading={isEditLoading[town.id]}
                    startContent={!isEditLoading[town.id] && <EditRoundedIcon fontSize="small" />}
                    className="w-1/2"
                    onPress={async () => {
                      setIsEditLoading({ ...isEditLoading, [town.id]: true });
                      await router.push(`/admin/towns/edit/${town.id}`);
                      setIsEditLoading({ ...isEditLoading, [town.id]: false });
                    }}
                  >
                    Edit
                  </Button>
                  <TownDeleteButton
                    id={town.id}
                    town={town.name}
                    onDelete={() => router.reload()}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab title="Add Town">
          <div className="flex flex-col items-center mt-10">
            <AddTown />
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminTowns;

import sql from "@lib/db";

export async function getServerSideProps() {
  const rows = await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at
    FROM towns
  `;

  return {
    props: {
      towns: rows,
    },
  };
}