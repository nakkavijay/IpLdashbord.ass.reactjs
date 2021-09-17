// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {
    matchStatus,
    competingTeamLogo,
    competingTeam,
    result,
    id,
  } = matchDetails
  console.log(result)
  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        className="image"
        alt="competing team {competing_team}"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
