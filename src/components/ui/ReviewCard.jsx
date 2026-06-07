// Review card — faithful to .rcard.
export default function ReviewCard({ review }) {
  const { name, date, stars, text } = review
  return (
    <div className="rcard">
      <div className="rcard__top">
        <div className="avatar" style={{ background: '#2a2a2a' }}>
          {name[0]}
        </div>
        <div>
          <div className="rcard__name">{name}</div>
          <div className="rcard__handle">{date}</div>
        </div>
      </div>
      <div className="stars">{'★'.repeat(stars)}</div>
      <p className="rcard__body">{text}</p>
    </div>
  )
}
