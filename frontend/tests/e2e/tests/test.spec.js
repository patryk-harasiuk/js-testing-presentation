/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />;

const urls1 = [
  "https://i.waifu.pics/slz3yPL.png",
  "https://i.waifu.pics/q9TWFa2.png",
  "https://i.waifu.pics/mbQ4c4V.jpg",
  "https://i.waifu.pics/sS-rREz.jpg",
  "https://i.waifu.pics/d22x2XR.jpg",
  "https://i.waifu.pics/07eNAFm.jpg",
  "https://i.waifu.pics/V2kTPbJ.jpg",
  "https://i.waifu.pics/q054x0_.png",
  "https://i.waifu.pics/MHrvoGY.jpg",
  "https://i.waifu.pics/R5n5P7f.png",
  "https://i.waifu.pics/~ccKs1-.jpg",
  "https://i.waifu.pics/E_U9eeg.jpg",
  "https://i.waifu.pics/L~qlLcJ.jpg",
  "https://i.waifu.pics/8m-r1_O.png",
  "https://i.waifu.pics/P6X-ph6.jpg",
  "https://i.waifu.pics/e6r~srS.png",
  "https://i.waifu.pics/~VVdn7B.png",
  "https://i.waifu.pics/n6U5SHh.png",
  "https://i.waifu.pics/Y5-tibK.png",
  "https://i.waifu.pics/HNEg0-Q.png",
  "https://i.waifu.pics/8EEfLuB.jpeg",
  "https://i.waifu.pics/onhjGAS.jpg",
  "https://i.waifu.pics/5SYyPac.png",
  "https://i.waifu.pics/cu~8th-.jpg",
  "https://i.waifu.pics/eULPvem.png",
  "https://i.waifu.pics/-ABlAvr.jpg",
  "https://i.waifu.pics/FS9NYz_.png",
  "https://i.waifu.pics/~bMLxB_.jpg",
  "https://i.waifu.pics/TrwecOg.jpg",
  "https://i.waifu.pics/-WhXn5t.jpg",
];

const urls2 = [
  "https://i.waifu.pics/3lGmN2f.jpg",
  "https://i.waifu.pics/mszwc3M.jpg",
  "https://i.waifu.pics/J7mX4Gx.png",
  "https://i.waifu.pics/Nc1m4wr.jpg",
  "https://i.waifu.pics/7btS~wY.png",
  "https://i.waifu.pics/5565TbO.jpg",
  "https://i.waifu.pics/21csA2B.png",
  "https://i.waifu.pics/U0xGNIS.jpg",
  "https://i.waifu.pics/iOaCMgS.png",
  "https://i.waifu.pics/tfc9dQ_.jpg",
  "https://i.waifu.pics/K6dnjVx.jpg",
  "https://i.waifu.pics/hTUgUZK.jpg",
  "https://i.waifu.pics/5RAVfRp.jpg",
  "https://i.waifu.pics/ebLgCR9.png",
  "https://i.waifu.pics/nzgcXil.png",
  "https://i.waifu.pics/G3tcTFi.jpg",
  "https://i.waifu.pics/PeCLokQ.jpg",
  "https://i.waifu.pics/n-Avxt-.jpg",
  "https://i.waifu.pics/4PEA-Xc.png",
  "https://i.waifu.pics/UDhO2-p.png",
  "https://i.waifu.pics/p_YhAv1.jpg",
  "https://i.waifu.pics/B_1Ci-K.png",
  "https://i.waifu.pics/LAdbipm.png",
  "https://i.waifu.pics/AwAKycl.png",
  "https://i.waifu.pics/ev14VQP.jpg",
  "https://i.waifu.pics/X8DfFJ3.png",
  "https://i.waifu.pics/upHplLk.jpg",
  "https://i.waifu.pics/DfOuvTM.jpg",
  "https://i.waifu.pics/3MoB7dZ.jpg",
  "https://i.waifu.pics/~5_CFu5.jpg",
];

// cy.request('POST', 'https://api.waifu.pics/many/sfw/waifu', {}).then(res => res.body.files).then(console.log)

describe("test unauthorized user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });

  it("header on page should have correct text", () => {
    cy.get("h6").should("have.text", "JS testing site");
  });
  it("there should be login button", () => {
    cy.get(".MuiButton-label").should("have.text", "Login");
  });

  it("should not add images", () => {
    cy.get("[data-cy=gallery-item]").then((galleryItems) => {
      urls1.slice(0, 1).forEach((url) => {
        cy.get("[data-cy=fab-add]")
          .click()
          .get("#url")
          .type(url)
          .get(".MuiDialogActions-root > :nth-child(2) > .MuiButton-label")
          .click();
      });
      cy.get("[data-cy=gallery-item]").should(
        "have.length",
        galleryItems.length
      );
    });
  });

  it("should not remove any images", () => {
    cy.get("[data-cy=gallery-item]").then((galleryItems) => {
      cy.get("[data-cy=delete]").first().click();
      cy.get("[data-cy=gallery-item]").should(
        "have.length",
        galleryItems.length
      );
    });
  });
});

describe("test authorized user", () => {
  it("header on page should have correct text", () => {
    cy.visit("http://localhost:4000/");
    cy.get("h6").should("have.text", "JS testing site");
  });

  it("there should be login button", () => {
    cy.get(".MuiButton-label").should("have.text", "Login");
  });

  it("should log in as admin", () => {
    cy.get("[data-cy=nav-login]")
      .should("have.text", "Login")
      .click()
      .get("#username")
      .type("admin")
      .get("#password")
      .type("admin")
      .get("[data-cy=login]")
      .click()
      .get("[data-cy=nav-login]")
      .should("have.text", "Logged as admin");
  });

  it("should add images", () => {
    cy.get("[data-cy=gallery-item]").then((galleryItems) => {
      urls1.slice(0, 5).forEach((url) => {
        cy.get("[data-cy=fab-add]")
          .click()
          .get("#url")
          .type(url)
          .get("[data-cy=add]")
          .click();
      });
      cy.get("[data-cy=gallery-item]").should(
        "have.length",
        galleryItems.length + 5
      );
    });
  });

  it("should remove one image", () => {
    cy.get("[data-cy=gallery-item]").then((galleryItems) => {
      cy.get("[data-cy=delete]").first().click();
      cy.get("[data-cy=gallery-item]").should(
        "have.length",
        galleryItems.length - 1
      );
    });
  });

  it("should remove all", () => {
    cy.get("[data-cy=delete]").each((el) => el.click());
    cy.get("[data-cy=gallery-item]").should("have.length", 0);
    cy.get(".makeStyles-media-3").children().should("have.length", 0);
    cy.screenshot();
  });

  it("should add cats", () => {
    urls2.slice(0, 10).forEach((url) => {
      cy.get("[data-cy=fab-add]")
        .click()
        .get("#url")
        .type(url)
        .get("[data-cy=add]")
        .click();
    });
    cy.get("[data-cy=gallery-item]").should("have.length", 10);
    cy.screenshot();
  });
});
