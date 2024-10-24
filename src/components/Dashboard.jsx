import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const [hoveredSpender, setHoveredSpender] = useState(null);

  const [cards, setCards] = useState([
    { id: '1', title: 'Total Spent', content: '$ 50K', subContent: '10% more than Last month' },
    { id: '2', title: 'Account Applied', content: '50', subContent: 'New vs Rep' },
    { id: '3', title: 'Profit Share', content: '$ 59K', subContent: '16% more than Last month' },
    {
      id: '4',
      title: 'Top Spender',
      spenders: [
        { name: 'Rohit', novSpending: '20k', decSpending: '50k' },
        { name: 'Sudhansu', novSpending: '15k', decSpending: '45k' },
        { name: 'Abhishek', novSpending: '13k', decSpending: '40k' },
        { name: 'Rahul', novSpending: '12k', decSpending: '35k' },
        { name: 'Meraj', novSpending: '10k', decSpending: '30k' },
      ],
    },
  ]);

  // Handle drag end logic
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCards = Array.from(cards);
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);

    setCards(reorderedCards);
  };

  return (
    <>
      <div className="p-4 min-h-full border border-customPurple rounded-md shadow-custom space-y-20">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dashboard-cards" direction="horizontal">
            {(provided) => (
              <div
                className="flex gap-10 justify-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-move"
                      // style={{
                      //   ...provided.draggableProps.style,
                      //   boxShadow: snapshot.isDragging
                      //     ? '0 1px 1px rgba(0,0,0,0.1)'
                      //     : 'none',
                      // }}
                      >
                        {card.title === 'Top Spender' ? (
                          <div className="flex justify-between relative cursor-move">
                            <div className="border w-64 bg-white rounded-lg border-customPurple shadow-custom">
                              <div className="p-3">
                                <p className="font-bold text-lg">{card.title}</p>
                                <div className="overflow-auto max-h-32 space-y-2 pr-2"
                                  style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#6f42c1 transparent'
                                  }}>
                                  {card.spenders.map((spender, idx) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between cursor-pointer hover:bg-gray-200 p-2 rounded transition-all duration-300 ease-in-out"
                                      onMouseEnter={() => setHoveredSpender(spender)}
                                      onMouseLeave={() => setHoveredSpender(null)}
                                    >
                                      <p>{spender.name}:</p>
                                      <p>{spender.novSpending}</p>
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                            {hoveredSpender && (
                              <div
                                className="absolute z-10 left-[-10px] top-[180px] right-1 bg-white p-4 border rounded-lg shadow-custom transition-opacity duration-300 ease-in-out"
                                style={{ transform: 'translate(10px, 10px)', width: '200px' }}
                              >
                                <p className="font-bold text-lg">{hoveredSpender.name}</p>
                                <p className="text-md text-gray-600">
                                  {hoveredSpender.novSpending} in November
                                </p>
                                <p className="text-md text-gray-600">
                                  {hoveredSpender.decSpending} in December
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="border p-3 space-y-3 w-64 bg-white rounded-lg border-customPurple shadow-custom">
                            <p className="font-bold text-lg">{card.title}</p>
                            <p className="font-semibold">{card.content}</p>
                            <p className="font-semibold">{card.subContent}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Dashboard;
