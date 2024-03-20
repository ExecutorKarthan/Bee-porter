function Jumbotron({ children }) {
return (
        // Jumbotron container with inline styles
        <div
            style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
        >
            {/* Render any children components passed to the Jumbotron */}
            {children}
        </div>
    );
}
  
export default Jumbotron;  