"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { ListWithCards } from "@/types";


import ListForm from "./list-form";
import ListItem from "./list-item";

interface ListContainerProps {
	data: ListWithCards[];
	boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}



const ListContainer = ({
	data,
	boardId
}: ListContainerProps) => {

	const [orderedData, setOrderedData] = useState(data);

	// Optimistic update

	useEffect(() => {
		setOrderedData(data);
	}, [data]);

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result;
		if (!destination) {
			return;
		};

		// if dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		};

		// User moves a list 
		if (type === "list") {
			const items = reorder(
				orderedData,
				source.index,
				destination.index
			).map((item, index) => ({ ...item, order: index }));

			setOrderedData(items);
			// TODO: Trigger server action 
		};

		// User moves a card
		if (type === "card") {
			let newOrderedData = [...orderedData];

			// Source and destination list
			const sourceList = newOrderedData.find(list => list.id === source.draggableId);
			const destinationList = newOrderedData.find(list => list.id === destination.draggableId);

			if (!sourceList || !destinationList) {
				return;
			};

			// Check if cards exist on the sourceList
			if (!sourceList.cards) {
				sourceList.cards = [];
			};

			// Check if cards exist on the destinationList
			if (!destinationList.cards) {
				destinationList.cards = [];
			};

			// Moving the card in the same list 
			if (source.draggableId === destination.draggableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);

				reorderedCards.forEach((card, index) => {
					card.order = index;
				});

				sourceList.cards = reorderedCards;

				setOrderedData(newOrderedData);
				// TODO: Trigger server action 
			}
		}

	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="lists" type="list" direction="horizontal">
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex gap-x-3 h-full"
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									key={list.id}
									index={index}
									data={list}
								/>
							)
						})}
						{provided.placeholder}
						<ListForm />
						<div className="flex-shrink 0 w-1" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default ListContainer