export default function linkToName(link: string) {
  try {
    const match = link.match(/\.com\/(.+)/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
  return "";
}
