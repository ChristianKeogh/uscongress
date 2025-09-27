import { Member } from "@/models/membercard-model";

export const fetchCongressNumber = async () => {
  try {
    const key = process.env.CONGRESS_KEY;
    if (!key) throw new Error("Missing CONGRESS_KEY");

    const res = await fetch(
      `https://api.congress.gov/v3/congress?api_key=${key}`
    );
    if (!res.ok)
      throw new Error(`Error fetching congress list: ${res.statusText}`);

    const data = await res.json();
    return data?.congresses?.[0]?.congress ?? null;
  } catch (e) {
    console.error("Error fetching Congress list:", e);
    return null;
  }
};

export const fetchAllMembers = async () => {
  const congressNum = await fetchCongressNumber();
  let allMembers: Member[] = [];
  let offset = 0;
  const limit = 250;
  let hasMoreData = true;

  while (hasMoreData) {
    try {
      const res = await fetch(
        `https://api.congress.gov/v3/member/congress/${congressNum}?offset=${offset}&limit=${limit}&format=json&api_key=${process.env.CONGRESS_KEY}`
      );

      if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);

      const data = await res.json();
      allMembers = [...allMembers, ...data.members];

      if (data.members.length < limit) {
        hasMoreData = false;
      } else {
        offset += limit;
      }
    } catch (error) {
      console.error("Error fetching Congress members:", error);
      hasMoreData = false;
    }
  }

  return allMembers;
};

export const fetchCongressMember = async (memberNumber: string) => {
  try {
    const res = await fetch(
      `https://api.congress.gov/v3/member/${memberNumber}?api_key=${process.env.CONGRESS_KEY}`,
      { cache: "force-cache" }
    );

    if (!res.ok) throw new Error(`Error fetching bill: ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Congress bills:", error);
    return null;
  }
};
