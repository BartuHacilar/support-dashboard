interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, total)

  return (
    <div className="pagination">
      <p>Showing <strong>{firstItem}-{lastItem}</strong> of <strong>{total}</strong></p>
      <div className="pagination-actions">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>{page} / {pageCount}</span>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === pageCount}>
          Next
        </button>
      </div>
    </div>
  )
}
