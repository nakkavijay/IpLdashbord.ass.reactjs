// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const randomBackgroundColors = [
  '#1e293b',
  '#a4261d',
  '#5755a7',
  '#d91c1f',
  '#f7db00',
  '#da237b',
  '#13418b',
  '#f26d22',
  '#ffffff33',
  '#4f5db0',
]

class TeamMatches extends Component {
  state = {
    teamBanner: '',
    latestMatchDetails: {},
    recentMatchDetails: [],
    gradientBackgroundColors: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getRecentMatches()
  }

  getRecentMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    // console.log(data)

    // modified data
    const modifiedObj = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    // console.log(modifiedObj)

    // object destructured for evaluation
    const {teamBannerUrl, latestMatchDetails, recentMatches} = modifiedObj

    const modifiedRecentMatchData = this.modifyData(recentMatches)
    const modifiedLatestMatchData = this.modifyData(latestMatchDetails)
    const colors = this.getRandomColors()
    this.setState({
      teamBanner: teamBannerUrl,
      latestMatchDetails: modifiedLatestMatchData,
      recentMatchDetails: modifiedRecentMatchData,
      gradientBackgroundColors: colors,
      isLoading: false,
    })
  }

  modifyData = object => {
    let modifiedData = null
    if (object.length === undefined) {
      modifiedData = {
        umpires: object.umpires,
        result: object.result,
        manOfTheMatch: object.man_of_the_match,
        id: object.id,
        date: object.date,
        venue: object.venue,
        competingTeam: object.competing_team,
        competingTeamLogo: object.competing_team_logo,
        firstInnings: object.first_innings,
        secondInnings: object.second_innings,
        matchStatus: object.match_status,
      }
    } else {
      modifiedData = object.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      }))
    }
    return modifiedData
  }

  getRandomColors = () => {
    const randomNumber = Math.floor(Math.random() * 10)
    const secondRandomNumber = randomNumber + 1

    const randomColors = {
      firstColor: randomBackgroundColors[randomNumber],
      secondColor: randomBackgroundColors[secondRandomNumber],
    }
    return randomColors
  }

  render() {
    const {
      teamBanner,
      latestMatchDetails,
      recentMatchDetails,
      gradientBackgroundColors,
      isLoading,
    } = this.state
    // console.log(teamBanner)
    // console.log(latestMatchDetails)
    // console.log(recentMatchDetail)
    // console.log(gradientBackgroundColors)
    const {firstColor, secondColor} = gradientBackgroundColors

    return (
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,${firstColor},${secondColor})`,
        }}
        className="team-matches-container"
      >
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img src={teamBanner} alt="team banner" />
            <h1 className="name">Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-card-container">
              {recentMatchDetails.map(each => (
                <MatchCard key={each.id} matchDetails={each} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}
export default TeamMatches
