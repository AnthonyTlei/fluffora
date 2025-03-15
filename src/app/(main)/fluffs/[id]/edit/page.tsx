import { validateRequest } from "@/auth";
import { getFluff } from "../../actions";
import EditFluffForm from "./FluffEditForm";

interface EditFluffPageProps {
  params: {
    id: string;
  };
}

export default async function EditFluffPage({
  params: { id },
}: EditFluffPageProps) {
  const { user } = await validateRequest();
  const fluff = await getFluff(id);

  if (!fluff) {
    return <p className="text-center text-red-500">Fluff not found.</p>;
  }

  return <EditFluffForm fluff={fluff} />;
}
