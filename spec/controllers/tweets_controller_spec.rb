require 'spec_helper'

describe TweetsController do
  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response.status).to eq(200)
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end

  describe "GET #topics" do
    it "responds successfully with an HTTP 200 status code" do
      get :topics
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
  end
end