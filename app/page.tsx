import { fetchAllMembers } from "@/api/api";
import HomePage from "@/components/ui/home-page";
import { countCongressMembers } from "@/lib/utils";

export const revalidate = 86400;

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  // Await the promise to get the real object
  const realSearchParams = searchParams ? await searchParams : undefined;

  const congress = await fetchAllMembers();
  const congressNumbers = countCongressMembers(congress);

  return (
    <HomePage
      allMembers={congress}
      congressNumbers={congressNumbers}
      initialSearch={realSearchParams?.search || ""}
    />
  );
}
