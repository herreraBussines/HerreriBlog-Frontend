import styled from "@emotion/styled";

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem 0;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.accent : theme.colors.primary};
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.05);
  }
`;

export const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = ['all', 'Tecnologia', 'Taller', 'Practica Supervisada'];

  return (
    <FilterContainer>
      {filters.map(filter => (
        <FilterButton
          key={filter}
          active={currentFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {filter === 'all' ? 'Todos' : filter}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};