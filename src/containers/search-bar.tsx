import React, { Component } from "react";
import { connect } from "react-redux";
import AutoBind from "autobind-decorator";

import { fetchPhotos, redirectToProfilePage } from "@src/actions/creators";

interface Props {
    fetchPhotos: typeof fetchPhotos;
    redirectToProfilePage: typeof redirectToProfilePage;
}
export class SearchBar extends Component<Props> {

    private readonly initialProfileName = "gorrion.pl";
    private inputField: HTMLInputElement;

    render() {
        return (
            <div className="input-group">
                <input
                    className="form-control"
                    ref={node => this.inputField = node!}
                    placeholder="profile name"
                    defaultValue={this.initialProfileName}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.onSearchSubmit}
                    >
                        Search
                    </button>
                </span>
            </div>
        );
    }

    @AutoBind
    private async onSearchSubmit() {
        const profileName = this.inputField.value;
        await this.props.fetchPhotos(profileName);
        this.props.redirectToProfilePage(profileName);
    }
}
export const SearchBarContainer = connect(null, { fetchPhotos, redirectToProfilePage })(SearchBar);
