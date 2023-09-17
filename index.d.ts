// Type definitions for Minecraft Bedrock Edition script APIs (experimental) 1.1.0-beta
// Project: https://docs.microsoft.com/minecraft/creator/
// Definitions by: Jake Shirley <https://github.com/JakeShirley>
//                 Mike Ammerlaan <https://github.com/mammerla>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* *****************************************************************************
   Copyright (c) Microsoft Corporation.
   ***************************************************************************** */
/**
 * The `mojang-minecraft-ui` module contains types for
 * expressing simple dialog-based user experiences.
 *
 *   * {@link mojang-minecraft-ui.ActionFormData} contain a list of
 * buttons with captions and images that can be used for
 * presenting a set of options to a player.
 *   * {@link mojang-minecraft-ui.MessageFormData} are simple
 * two-button message experiences that are functional for
 * Yes/No or OK/Cancel questions.
 *   * {@link mojang-minecraft-ui.ModalFormData} allow for a more
 * flexible "questionnaire-style" list of controls that can be
 * used to take input.
 * @example createActionForm.js
 * ```typescript
 * const form = new ActionFormData()
 *   .title("Months")
 *   .body("Choose your favorite month!")
 *   .button("January")
 *   .button("February")
 *   .button("March")
 *   .button("April")
 *   .button("May");
 *
 * form.show(players[0]).then((response) => {
 *   if (response.selection === 3) {
 *     dimension.runCommand("say I like April too!");
 *   }
 * });
 *
 * ```
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-ui",
 *   "version": "1.1.0"
 * }
 * ```
 *
 */
import * as MC from "@minecraft/server";

export enum FormCancelationReason {
    UserBusy   = "UserBusy",
    UserClosed = "UserClosed",
}
export enum FormRejectionReason {
    MalformedResponse = "MalformedResponse",
    PlayerQuit        = "PlayerQuit",
    ServerShutdown    = "ServerShutdown",
}
/**
 * Builds a simple player form with buttons that let the player take
 * action.
 */
export class ActionFormData {
    /**
     * Creates a new modal form builder.
     */
    constructor();
    /**
     * Method that sets the body text for the modal form.
     */
    body(bodyText: MC.RawMessage | string): ActionFormData;
    /**
     * Adds a button to this form with an icon from a resource pack.
     */
    button(text: MC.RawMessage | string, iconPath?: string): ActionFormData;
    /**
     * Creates and shows this modal popup form. Returns asynchronously when
     * the player confirms or cancels the dialog.
     * @param player
     * Player to show this dialog to.
     */
    show(player: MC.Player): Promise<ActionFormResponse>;
    /**
     * This builder method sets the title for the modal dialog.
     */
    title(titleText: MC.RawMessage | string): ActionFormData;
}
/**
 * Returns data about the player results from a modal action form.
 */
export class ActionFormResponse extends FormResponse {
    protected constructor();
    /**
     * Returns the index of the button that was pushed.
     */
    readonly selection?: number;
}
/**
 * Base type for a form response.
 */
export class FormResponse {
    protected constructor();
    /**
     * Contains additional details as to why a form was canceled.
     */
    readonly cancelationReason?: FormCancelationReason;
    /**
     * If true, the form was canceled by the player (e.g., they selected
     * the pop-up X close button).
     */
    readonly canceled: boolean;
}
/**
 * Builds a simple two-button modal dialog.
 */
export class MessageFormData {
    /**
     * Creates a new modal form builder.
     */
    constructor();
    /**
     * Method that sets the body text for the modal form.
     */
    body(bodyText: MC.RawMessage | string): MessageFormData;
    /**
     * Method that sets the text for the first button of the dialog.
     */
    button1(text: MC.RawMessage | string): MessageFormData;
    /**
     * This method sets the text for the second button on the dialog.
     */
    button2(text: MC.RawMessage | string): MessageFormData;
    /**
     * Creates and shows this modal popup form. Returns asynchronously when
     * the player confirms or cancels the dialog.
     * @param player
     * Player to show this dialog to.
     */
    show(player: MC.Player): Promise<MessageFormResponse>;
    /**
     * This builder method sets the title for the modal dialog.
     */
    title(titleText: MC.RawMessage | string): MessageFormData;
}
/**
 * Returns data about the player results from a modal message form.
 */
export class MessageFormResponse extends FormResponse {
    protected constructor();
    /**
     * Returns the index of the button that was pushed.
     */
    readonly selection?: number;
}
/**
 * Used to create a fully customizable pop-up form for a player.
 */
export class ModalFormData {
    /**
     * Creates a new modal form builder.
     */
    constructor();
    /**
     * Adds a dropdown with choices to the form.
     */
    dropdown(label: MC.RawMessage | string,
             options: (MC.RawMessage | string)[],
             defaultValueIndex?: number
            ): ModalFormData;
    /**
     * Creates and shows this modal popup form. Returns asynchronously when
     * the player confirms or cancels the dialog.
     * @param player
     * Player to show this dialog to.
     */
    show(player: MC.Player): Promise<ModalFormResponse>;
    /**
     * Adds a numeric slider to the form.
     */
    slider(label: MC.RawMessage | string,
           minimumValue: number,
           maximumValue: number,
           valueStep: number,
           defaultValue?: number
          ): ModalFormData;
    /**
     * Adds a textbox to the form.
     */
    textField(label: MC.RawMessage | string,
              placeholderText: MC.RawMessage | string,
              defaultValue?: string
             ): ModalFormData;
    /**
     * This builder method sets the title for the modal dialog.
     */
    title(titleText: MC.RawMessage | string): ModalFormData;
    /**
     * Adds a toggle checkbox button to the form.
     */
    toggle(label: MC.RawMessage | string, defaultValue?: boolean): ModalFormData;
}
/**
 * Returns data about player responses to a modal form.
 */
export class ModalFormResponse extends FormResponse {
    protected constructor();
    /**
     * An ordered set of values based on the order of controls specified by
     * ModalFormData.
     */
    readonly formValues?: (boolean | number | string)[];
}
