import "./menucard.css";

function MenuCard({ title, onClick }) {
  return (
    <div className="menu-card" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
}

export default MenuCard;
