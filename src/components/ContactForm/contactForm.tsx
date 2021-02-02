import React from 'react';
import { Form } from 'semantic-ui-react';
import './contactForm.less';

class ContactForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { first_name: '', last_name: '', email: '', phone: '', message: '' };
    }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    render() {
        const { disabled, t } = this.props;
        const { first_name, last_name, email, phone, message } = this.state;

        return (
            <form
                className="ui form"
                name="form-contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/contact/thanks"
            >
                <fieldset style={{ border: 'none' }} disabled={disabled}>
                    <input type="hidden" name="form-name" value="form-contact" />
                    <input type="hidden" name="bot-field" />
                    <Form.Group widths="equal">
                        <div className="field">
                            <label>First Name</label>
                            <div className="ui fluid input">
                                <input
                                    required
                                    type="text"
                                    name="first_name"
                                    value={first_name}
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <div className="ui fluid input">
                                <input
                                    required
                                    type="text"
                                    name="last_name"
                                    value={last_name}
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <div className="field">
                            <label>Email</label>
                            <div className="ui fluid input">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Phone</label>
                            <div className="ui fluid input">
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    placeholder="Phone"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <div className="field">
                        <label>Message</label>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={message}
                            rows={3}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="field">
                        <button className="ui button primary" type="submit">
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default ContactForm;
