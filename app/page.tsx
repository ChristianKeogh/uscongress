import { fetchAllMembers } from "@/api/api";
import HomePage from "@/components/ui/home-page";
import { countCongressMembers } from "@/lib/utils";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function Home(props: any) {
  //TODO: Needs fix. This is because of some strange type errors coming from the .next folder
  const searchParams = await props.searchParams;

  const congress = await fetchAllMembers();
  const congressNumbers = countCongressMembers(congress);

  return (
    <HomePage
      allMembers={congress}
      congressNumbers={congressNumbers}
      initialSearch={searchParams.search || ""}
    />
  );
}
