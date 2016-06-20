import React from 'react'
import numeral from 'numeral'

import CardProjectLabels from '../common/CardProjectLabels'
import formatUrl from '../../helpers/formatUrl'

const digits = (value) => (value > 1000) ? '0.0' : '0'

function followersComment(value) {
  if (value === 0) return `you don't need all these followers!`
  if (value < 10) return `that's better than nothing!`
  if (value < 100) return `that's not so bad!`
  if (value < 1000) return `that's pretty good, you could be a hall of famer too!`
  return `that's a lot of followers, you should be in this hall of fame!`
}

export default ({ hero, you, isCurrentUser, showDetails }) => {
  return (
    <div className={`hero-card${isCurrentUser ? ' current-user' : ''}`}>
      <a className="header card-block" target="_blank"
        href={`https://github.com/${hero.username}`}
        data-balloon={`Open ${hero.username}'s profile on Github`}
      >
        <img src={`${hero.avatar}&s=150`} width="100" height="100" alt={hero.username} />
        <div className="header-text">
          <div className="name">
            {hero.name}
            {isCurrentUser && (
              <span style={{ color: 'rgba(255,255,255,.6)' }}> (You)</span>
            )}
          </div>
          {hero.username && (
            <div className="github-data">
              <div>
                <span className="text-secondary">{hero.username}</span>
                <div className="text-secondary">
                  {numeral(hero.followers).format(`${digits(hero.followers)} a`)} followers
                  {' '}
                  {you && <span style={{ color: '#aaa', fontSize: 14 }}>
                  ({followersComment(hero.followers)})
                  </span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </a>
      {showDetails && hero.projects.length > 0 && <CardProjectLabels
        projects={hero.projects}
      />}
      {showDetails && hero.bio && (
        <div className="inner">
          {hero.bio}
        </div>
      )}
      {showDetails && hero.blog && (
        <a
          className="inner card-block" target="_blank"
          data-balloon={`Open ${hero.username}'s website/blog`}
          href={hero.blog}
        >
          <span className="mega-octicon octicon-globe icon"></span>
          <span>{formatUrl(hero.blog)}</span>
        </a>
      )}
      {showDetails && hero.modules > 0 && (
        <a
          className="inner card-block" target="_blank"
          data-balloon={`Open ${hero.username}'s profile on npm`}
          href={`https://www.npmjs.com/~${hero.npm || hero.username}`}
        >
          <span className="mega-octicon octicon-package icon"></span>
          <span>{hero.modules} modules on npm</span>
        </a>
      )}
    </div>
)}
