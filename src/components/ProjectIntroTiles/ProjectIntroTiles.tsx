import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import LordIcon from '../Innovation/lordicon';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': React.DetailedHTMLProps<any, any>;
        }
    }
}

export interface ProjectIntroTilesInput {
    headline: string;
    subheadline: string;
    tileHeader1: string;
    tileText1: string;
    tileHeader2: string;
    tileText2: string;
    tileHeader3: string;
    tileText3: string;
    tileHeader4: string;
    tileText4: string;
}

const ProjectIntroTiles = (input: ProjectIntroTilesInput) => {

    return (
        <section className="main-section">
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='left'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}>{input?.headline}</h3>
                    <h2 className="global-headline">{input?.subheadline}</h2>
                </Header>
                <Grid columns="4" stackable centered>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/projekte/template/pin.json"></LordIcon>
                            <strong>{input?.tileHeader1}</strong>
                            <p>{input?.tileText1}</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/projekte/template/map.json"></LordIcon>
                            <strong>{input?.tileHeader2}</strong>
                            <p>{input?.tileText2}</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/projekte/template/todo.json"></LordIcon>
                            <strong>{input?.tileHeader3}</strong>
                            <p>{input?.tileText3}</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/projekte/template/people.json"></LordIcon>
                            <strong>{input?.tileHeader4}</strong>
                            <p>{input?.tileText4}</p>
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default ProjectIntroTiles;
