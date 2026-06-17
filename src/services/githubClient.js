// src/services/githubClient.js
// Accesses the GitHub REST API to fetch repo details and README files.

const GITHUB_API_URL = 'https://api.github.com'

export async function fetchRepoReadme(repoName, username = 'Vaibhav20k') {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${username}/${repoName}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return 'No README file found for this repository.'
      }
      throw new Error(`GitHub API returned status: ${response.status}`)
    }

    const data = await response.json()
    
    // Decode base64 README content
    // Use window.atob and decodeURIComponent to correctly handle Unicode characters
    const decodedContent = decodeURIComponent(
      window.atob(data.content.replace(/\s/g, ''))
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    // Slice content if too long to prevent overflowing LLM context limits
    return decodedContent.slice(0, 4000)
  } catch (err) {
    console.error(`Error fetching README for ${repoName}:`, err)
    return `Failed to load README content for repository ${repoName}.`
  }
}
