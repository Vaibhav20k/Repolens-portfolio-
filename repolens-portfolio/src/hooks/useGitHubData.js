import { useState, useEffect, useCallback } from 'react'

const CACHE_KEY = 'repolens_github_cache'
const CACHE_TTL = 3600 * 1000 // 1 hour in milliseconds

export function useGitHubData() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Vaibhav20k'

  const fetchRepos = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)

    try {
      // 1. Check local storage if not forced
      if (!force) {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { timestamp, data } = JSON.parse(cached)
          const age = Date.now() - timestamp

          if (age < CACHE_TTL) {
            console.log('Serving GitHub data from localStorage cache. Age:', (age / 1000 / 60).toFixed(1), 'mins')
            setRepos(data)
            setLoading(false)
            return
          }
        }
      }

      // 2. Fetch fresh details from GitHub API
      console.log('Fetching fresh repository data for user:', username)
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
      
      if (!response.ok) {
        throw new Error(`GitHub API returned status: ${response.status}`)
      }

      const rawData = await response.json()
      
      // 3. Map to simple model as defined in schema
      const mappedData = rawData.map(repo => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        language: repo.language || 'Plain Text',
        stars: repo.stargazers_count || 0,
        url: repo.html_url,
        topics: repo.topics || []
      }))

      // 4. Update state and cache
      setRepos(mappedData)
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: mappedData
      }))
    } catch (err) {
      console.error('Error fetching GitHub repos:', err)
      setError(err.message)
      
      // Fallback to cache even if expired if we encounter network issues
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data } = JSON.parse(cached)
        setRepos(data)
        console.log('Network error occurred; serving expired cached data as fallback.')
      }
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  return { repos, loading, error, refetch: () => fetchRepos(true) }
}
