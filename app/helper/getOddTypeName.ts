const getOddTypeName = (item) => {
  const {oddsType, betType, homeCompetitorName, awayCompetitorName} = item

  switch (betType) {
    case 'Collectco': {
      const scores = oddsType.split(':')
      if (scores[0] > 4 || scores[1] > 4) return 'Other'
      if (scores[0] > scores[1]) return homeCompetitorName
      if (scores[0] < scores[1]) return awayCompetitorName
      if (scores[0] === scores[1]) return 'Draw'
    }

    case 'first goal':

    case 'winner':

    case '1x2': {
      if (oddsType === '{$competitor1}') return homeCompetitorName
      if (oddsType === '{$competitor2}') return awayCompetitorName
    }

    case 'Halftime/fulltime':

    case 'Handicap': {
      return oddsType
        .replace('{$competitor1}', homeCompetitorName)
        .replace('{$competitor2}', awayCompetitorName);
    }

    case 'Total': {
      return capitalize(oddsType)
    }

    case 'yes': {
      return 'Yes'
    }

    case 'no': {
      return 'No'
    }

    default:
      throw Error('Bet type invalid!')
  }
}

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)
