const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo deliveroo" />
      </div>
    </header>
  );
};
export default Header;
