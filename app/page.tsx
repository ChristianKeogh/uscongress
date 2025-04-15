import { fetchAllMembers } from "@/api/api";
import ClientCongressView from "@/components/ui/home-page";
import { countCongressMembers } from "@/lib/utils";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const initialSearch = await searchParams;

  //TODO: Needs fix. This is because of some strange type errors coming from the .next folder

  const congress = await fetchAllMembers();
  const congressNumbers = countCongressMembers(congress);

  return (
    <ClientCongressView
      allMembers={congress}
      congressNumbers={congressNumbers}
      initialSearch={initialSearch?.search || ""}
    />
  );
}
