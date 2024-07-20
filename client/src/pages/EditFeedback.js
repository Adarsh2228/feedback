import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { findSuggestionById } from '../features/suggestions/suggestionsSlice';
import { getCurrentUser } from '../features/users/usersSlice';
import { suggestionEdited, suggestionDeleted } from '../features/suggestions/suggestionsSlice';

import SuggestionForm from '../features/suggestions/SuggestionForm';
import GoBack from '../reusable/GoBackLink';
import NotAuthorised from '../reusable/NotAuthorised';

// styled component
import { FormPageWrapper } from '../features/suggestions/SuggestionsStyles';

const EditFeedback = () => {
    const { requestId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentSuggestion = useSelector(state => findSuggestionById(state, requestId));

    const currentUser = useSelector(state => getCurrentUser(state));

    const isAllowed = currentUser.id === currentSuggestion.userId;

    const editSuggestion = ({title, category, status, description}) => {
        dispatch(suggestionEdited({
            suggestionId: requestId,
            title,
            category,
            status,
            description,
            userId: currentUser.id
        }));

        navigate(`/productRequests/${requestId}`);
    }

    const deleteSuggestion = () => {
        dispatch(suggestionDeleted(currentSuggestion.id));

        navigate('/productRequests');
    }

    return (
        <FormPageWrapper>
            <header>
                <GoBack darkText={true}/>
            </header>
            { isAllowed ?
                <SuggestionForm 
                    heading={`Editing '${currentSuggestion.title}'`}
                    title={currentSuggestion.title}
                    category={currentSuggestion.category}
                    description={currentSuggestion.description}
                    status={currentSuggestion.status}
                    submitBtnText='Save Changes'
                    onFormSubmitted={editSuggestion}
                    goBack={`/productRequests/${requestId}`}
                    onDelete={deleteSuggestion}
                />
            : <NotAuthorised />
        }

        </FormPageWrapper>
    )
}

export default EditFeedback;
