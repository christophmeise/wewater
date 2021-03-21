import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import './faq-accordion.less';

export default class FAQAccordion extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { activeIndex: null };
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    };

    render() {
        const { activeIndex } = this.state;
        const { faqContent } = this.props;

        return (
            <Accordion fluid>
                {faqContent.map((faq) => {
                    return (
                        <div key={faq.index}>
                            <AccordionItem
                                activeIndex={activeIndex}
                                index={faq.index}
                                handleClick={this.handleClick}
                                titleKey={faq.question}
                                contentKey={faq.answer}
                            ></AccordionItem>
                        </div>
                    );
                })}
            </Accordion>
        );
    }
}

class AccordionItem extends React.Component<any, any> {
    divElement: any;

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        };
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
    }

    render() {
        const { activeIndex, index, handleClick, titleKey, contentKey } = this.props;

        const cleanHeader = titleKey.replace(/\u00a0/g, " ");
        const cleanContent = contentKey.replace(/\u00a0/g, " ");

        let height = 0;
        if (activeIndex === index) {
            height = this.state.height;
        }

        return (
            <div className="accordion-item">
                <Accordion.Title
                    className="accordion-title"
                    key={'title' + index}
                    active={activeIndex === index}
                    index={index}
                    onClick={handleClick}
                >
                    {cleanHeader}
                    <Icon name="dropdown" />
                </Accordion.Title>
                <Accordion.Content key={'content' + index} active={activeIndex === index} style={{ height: height }}>
                    <p
                        ref={(divElement) => {
                            this.divElement = divElement;
                        }}
                    >
                        {cleanContent}
                    </p>
                    {/*    dangerouslySetInnerHTML={{ __html: contentKey }} */}
                </Accordion.Content>
            </div>
        );
    }
}
