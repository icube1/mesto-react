import logo from '../images/header__logo.svg'

export default function Header() {
  return (
    <header className="header">
    <img src={logo}
    alt="Логотип Место"
    className="header__logo"
    />
  </header>
  )
}
