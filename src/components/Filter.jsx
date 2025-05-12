import styled from "@emotion/styled";

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.accent : theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
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