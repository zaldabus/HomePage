class RootsController < ApplicationController
  def index

  end

  def create
    ContactMe.contact_mail(
                  params[:mail][:name],
                  params[:mail][:email],
                  params[:mail][:message]
                  )
                  .deliver!

    render :index
  end

  def tictactoe
    render layout: nil
  end

  def asteroids
    render layout: nil
  end
end
