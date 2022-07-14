import WorkshopsList from "../../components/pages/workshopList";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

describe( 'WorkshopsList initial page load', () => {
    test( 'should show the loading message initially', () => {
        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        const loadingMessage = screen.getByTestId( 'loading-message' );
        expect( loadingMessage ).toBeInTheDocument();
    });

    test( 'should show the list of workshops on load', () => {

    });
});