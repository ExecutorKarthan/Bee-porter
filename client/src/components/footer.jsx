export default function Footer() {
  return (
    <footer>
      <div className='product'>
        <div className='description'>
          <h3>Help Save the Bees!</h3>
          <h5>All donations we receive will be sent to <a href="https://www.operationhoneybee.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Operation Honey Bee</a></h5>
        </div>
      </div>
      <form action='/create-checkout-session' method='POST'>
        <button type="submit" className="button donate-button">Donate Here</button>
      </form>
    </footer>
  );
}