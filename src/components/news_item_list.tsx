export type NewsItem = {
  id: string
  title: string
  content: string
}

function NewsItemList({ items }: { items: NewsItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  )
}

export default NewsItemList
