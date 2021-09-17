// Write your code here

import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li>
      <Link className="team-card" to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard