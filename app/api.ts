import { Member } from "@/components/card";

export const fetchCongress = async () => {
  let data = "unfound";
  try {
    const res = await fetch(
      `https://api.congress.gov/v3/member?api_key=${process.env.CONGRESS_KEY}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Error fetching members: ${res.statusText}`);
    data = await res.json();
  } catch (error) {
    console.error("Error fetching Congress members:", error);
  }
  return JSON.stringify(data);
};

export async function fetchAllMembers() {
  let allMembers: Member[] = [];
  let offset = 0;
  const limit = 250; // Maximum allowed by API
  const apiKey = process.env.CONGRESS_KEY; // Store key in .env.local
  let hasMoreData = true;

  while (hasMoreData) {
    try {
      const res = await fetch(
        `https://api.congress.gov/v3/member?offset=${offset}&limit=${limit}&format=json&api_key=${apiKey}`
      );

      if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);

      const data = await res.json();
      allMembers = [...allMembers, ...data.members];

      if (data.members.length < limit) {
        hasMoreData = false; // Stop when we get less than 250 members
      } else {
        offset += limit; // Move to the next batch
      }
    } catch (error) {
      console.error("Error fetching Congress members:", error);
      hasMoreData = false;
    }
  }

  return allMembers;
}
