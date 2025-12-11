function Header() {
  return (
    <header className="flex">
      <Link
        to={user && user.role === "admin" ? "/admin" : "/"}
        className="flex principalBtn"
      >
        <img className="logo" src="/icon.png" alt="Icon" />
        <h1>EcoMercado</h1>
      </Link>

      <div className="flex searchBar">
        {(!user || user.role === "client") && (
          <form className="flex" onSubmit={goSearchInterface}>
            <input
              className="input"
              type="text"
              placeholder="Search for what you want"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowProducts(true)}
              onBlur={handleInputBlur}
            />
            <button type="submit" className="flex">
              <IoIosSearch className="icon" />
            </button>
          </form>
        )}
        {showProducts && (
          <div className="suggestContainer flex">
            {productsFilter.slice(0, 10).map((product, id) => (
              <Link key={id} to={`/product/${product.id}`}>
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex">
        {user ? (
          <button
            className="btn btnLogin"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.email}
          </button>
        ) : (
          <Link className="btn btnLogin" to="/login">
            Log in or register
          </Link>
        )}
        {shoppingContext && (
          <button
            className="btn btnCart flex"
            onClick={() => navigate("/shoppingCart")}
          >
            <TiShoppingCart />
            <span className="flex">{shoppingContext.length}</span>
          </button>
        )}
        {showOptionsUser && (
          <div
            className="optionsUser flex"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.role === "client" && <Link to="/profile">My Profile</Link>}
            {user.role === "client" && (
              <Link to="/publishProduct/0">Publish</Link>
            )}
            {user.role === "client" && (
              <Link to="/editSales">Edit Listings</Link>
            )}
            {user.role === "client" && (
              <Link to="/profileSales">Sold Items</Link>
            )}
            {user.role === "client" && (
              <Link to="/profilePurchases">My Purchases</Link>
            )}
            <Link onClick={handleLogout}>Log Out</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
