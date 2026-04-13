import React from 'react'
import Link from '@docusaurus/Link'

const primaryLinks = [
  { label: 'About', href: 'https://apicostx.com/about/' },
  { label: 'Pricing', href: 'https://apicostx.com/membership-levels/' },
  { label: 'APP', href: 'https://apicostx.com/app/' },
  { label: 'Docs', to: '/' },
]

const secondaryLinks = [
  { label: 'Security', href: 'https://apicostx.com/security/' },
  { label: 'Buy Credits', href: 'https://apicostx.com/credits/' },
  { label: 'Log In', href: 'https://apicostx.com/login/' },
]

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer acx-footer">
      <div className="acx-footer__inner">
        <div className="acx-footer__top">
          <div className="acx-footer__brand">
            <p className="acx-footer__title">API Cost X</p>
            <p className="acx-footer__tagline">
              Help, operations, and developer documentation for ACM / API Cost X.
            </p>
          </div>

          <div className="acx-footer__links">
            <nav className="acx-footer__nav" aria-label="Main links">
              {primaryLinks.map((link) => (
                link.to ? (
                  <Link key={link.label} className="acx-footer__link" to={link.to}>
                    {link.label}
                  </Link>
                ) : (
                  <Link key={link.label} className="acx-footer__link" href={link.href} target="_self">
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            <nav className="acx-footer__nav" aria-label="Account links">
              {secondaryLinks.map((link) => (
                <Link key={link.label} className="acx-footer__link" href={link.href} target="_self">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="acx-footer__bottom">
          <p>API Cost X</p>
          <p>Documentation</p>
        </div>
      </div>
    </footer>
  )
}
