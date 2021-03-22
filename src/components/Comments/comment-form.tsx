import { Mutation } from '@apollo/client/react/components';
import { Trans } from 'gatsby-plugin-react-i18next';
import gql from 'graphql-tag';
import React from 'react';
import { Button, Form, FormField, FormGroup, Input, TextArea } from 'semantic-ui-react';

// Create a GraphQL mutation for comment submissions.
const commentSubmitQuery = gql`
	mutation($author: String, $commentOn: Int, $content: String, $authorEmail: String) {
		createComment(
			input: {
				clientMutationId: "CreateComment"
				author: $author
				commentOn: $commentOn
				content: $content
				authorEmail: $authorEmail
			}
		) {
			success
		}
	}
`;

class CommentForm extends React.Component<any, any> {
	constructor(props) {
		super(props);
		// Set the initial state.
		this.state = {
			commentStatus: false,
			post: props.postId,
			comment: '',
			author: '',
			email: '',
			url: '',
		};

		// Bind input changes.
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	// Handles input change events.
	handleInputChange(event) {
		const target = event.target;
		const value = event.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		// Sets the state of the input field.
		this.setState({
			[name]: value,
		});
	}

	// Renders the comment form elements.
	renderCommentForm() {
		return (
			// Wrap it in our mutation.
			<Mutation
				mutation={commentSubmitQuery}
				// Set completion state.
				onCompleted={() => {
					this.setState({ commentStatus: 'success' });
				}}
				// Set error state.
				onError={() => {
					this.setState({ commentStatus: 'error' });
				}}
			>
				{(addComment) => (
					// Render the form.
					<Form
						className="global-header-padding"
						onSubmit={(event) => {
							// Prevent default form submit behavior.
							event.preventDefault();
							// Set initial loading state on submission.
							this.setState({ commentStatus: 'loading' });
							// Run the mutation.
							addComment({
								variables: {
									author: this.state.author,
									commentOn: this.state.post,
									content: this.state.comment,
									authorEmail: this.state.email,
								},
							});
						}}
					>
						<h3><Trans>Hinterlasse eine Nachricht</Trans></h3>
						<p><Trans>Deine Email wird nicht veröffentlicht. Notwendige Felder sind markiert *</Trans></p>
						<FormGroup>
							<FormField style={{ width: '100%' }}>
								<TextArea rows={8} style={{ resize: 'none' }} name="comment" value={this.state.comment} onChange={this.handleInputChange} />
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField>
								<label htmlFor="author"><Trans>Name</Trans>*</label>
								<Input name="author" value={this.state.author} onChange={this.handleInputChange} />
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField>
								<label htmlFor="email"><Trans>Email</Trans>*</label>
								<Input name="email" value={this.state.email} onChange={this.handleInputChange} />
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField>
								<Button name="submit" type="submit" primary className="rounded shadow"><Trans>Kommentar senden</Trans></Button>
							</FormField>
						</FormGroup>
					</Form>
				)}
			</Mutation>
		);
	}

	// Render the comment form.
	render() {
		// Check comment status from component state and display messages or form.
		switch (this.state.commentStatus) {
			case 'success':
				return 'Your comment has been successfully submitted.';
			case 'loading':
				return 'Please wait. Your comment is being submitted.';
			case 'error':
				return 'There was an error in your submission. Please try again later.';
			default:
				return this.renderCommentForm();
		}
	}
}

export default CommentForm;