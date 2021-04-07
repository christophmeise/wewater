import { Mutation } from '@apollo/client/react/components';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
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
			dsgvo: false
		};

		// Bind input changes.
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	// Handles input change events.
	handleInputChange(event) {
		const target = event.target;
		const value = event.target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		// Sets the state of the input field.
		this.setState({
			[name]: value,
		});
	}

	isDisabled(): boolean {
		return this.state.dsgvo !== true ||
			this.state.comment?.length === 0 ||
			this.state.email?.length === 0 ||
			this.state.author?.length === 0;
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
						<FormGroup inline className="dsgvo-checkbox-wrapper-wrapper">
							<FormField inline className="dsgvo-checkbox-wrapper">
								<input className="ui checkbox" name="dsgvo" type="checkbox" value={this.state.dsgvo} onChange={this.handleInputChange}></input>
								<label htmlFor="dsgvo"><Trans>Mit der Nutzung dieses Formulars erklären Sie sich mit der Speicherung und Verarbeitung Ihrer Daten durch diese Website einverstanden. Weitere Informationen erfahren Sie in der <Link to="/dataprotection">Datenschutzerklärung</Link></Trans>*</label>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField>
								<Button name="submit" type="submit" disabled={this.isDisabled()} primary className="rounded shadow"><Trans>Kommentar senden</Trans></Button>
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
				return <p><Trans>Dein Kommentar wurde erfolgreich gespeichert.</Trans></p>;
			case 'loading':
				return <p><Trans>Dein Kommentar wird abgeschickt...</Trans></p>;
			case 'error':
				return <p><Trans>Dein Kommentar konnte leider nicht gespeichert werden, probiere es später bitte noch einmal</Trans></p>;
			default:
				return this.renderCommentForm();
		}
	}
}

export default CommentForm;