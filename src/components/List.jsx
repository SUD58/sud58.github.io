import { useState, useEffect } from "react";

export default function List() {
  const [repoList, setRepoList] = useState([]);
  const username = "sud58"; // Your GitHub username

  useEffect(() => {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((repos) => {
        const filteredRepos = repos.filter(
          (repo) => repo.has_pages && !repo.name.includes(username),
        ); // Filter repos with Pages enabled
        setRepoList(filteredRepos); // Update the state with filtered repositories
      })
      .catch((error) => console.error("Error fetching repositories:", error));
  }, []);

  const formatRepoName = (name) => {
    // Replace hyphens with spaces temporarily
    let formattedName = name.replace(/-/g, " ");

    // Add a colon after "Frontend Mentor" or "Odin" (case-insensitive)
    formattedName = formattedName.replace(
      /\b(Frontend Mentor|Odin)\b/gi,
      "$1:",
    );

    // Capitalize each word in the name
    formattedName = formattedName
      .split(" ") // Split into words
      .map((word) => {
        // Special handling: Keep certain words hyphenated
        if (["etch", "sketch"].includes(word.toLowerCase())) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ") // Join back with spaces
      .replace(/ Etch A Sketch/gi, " Etch-a-Sketch"); // Reinstate hyphen for "Etch-a-Sketch"

    return formattedName;
  };

  const repoListItems = repoList.map((repo) => {
    // If homepage is null, construct the URL based on GitHub Pages format
    const pageUrl =
      repo.homepage || `https://${username}.github.io/${repo.name}/`;

    return (
      <li key={repo.id} className="w-full">
        <a
          href={pageUrl}
          rel="noopener noreferrer"
          className="flex w-full rounded-2xl bg-zinc-900 p-4 shadow-lg transition-shadow hover:shadow-2xl"
        >
          {formatRepoName(repo.name)}
        </a>
      </li>
    );
  });

  return (
    <>
      <ul className="flex w-full flex-col gap-4">{repoListItems}</ul>
    </>
  );
}
