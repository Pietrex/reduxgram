import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps, match } from "react-router";

import { RootState } from "@src/state/state";
import { CommentsList } from "@src/components/comments-list";
import { Photo as PhotoData } from "@src/interfaces/data";
import { fetchPhotos } from "@src/actions/creators";

interface Props {
    match: match<{profileName: string}>;
    photo: PhotoData | undefined;
    fetchPhotos: typeof fetchPhotos;
}
export class Photo extends Component<Props> {

    componentDidMount() {
        if (!this.props.photo) {
            this.loadData();
        }
    }

    render() {
        const { photo } = this.props;

        if (!photo) {
            return <span>Loading photo...</span>;
        } else {
            return (
                <div className="text-center" style={{ width: "100%" }}>
                    <a target="_blank" href={photo.link}>
                        <img src={photo.images.standard} style={{ maxWidth: "100%" }}/>
                    </a>
                    {photo.comments.length === 0 ? (
                        <h3>No comments available.</h3>
                    ) : (
                        <div>
                            <h4>Comments:</h4>
                            <CommentsList comments={photo.comments} />
                        </div>
                    )}
                </div>
            );
        }
    }

    private loadData() {
        this.props.fetchPhotos(this.props.match.params.profileName);
    }
}
function mapStateToProps(state: RootState, ownProps: RouteComponentProps<{photoId: string}>) {
    return { photo: state.photos.photos.find(photo => photo.id === ownProps.match.params.photoId) };
}
function mapDispatchToProps() {
    return { fetchPhotos };
}
export const PhotoContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Photo));
