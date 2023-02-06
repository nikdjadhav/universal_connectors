import TkCard, { TkCardBody } from '@/globalComponents/TkCard'
import TkForm from '@/globalComponents/TkForm'
import TkInput from '@/globalComponents/TkInput'
import TkRow, { TkCol } from '@/globalComponents/TkRow'
import React from 'react'

const NewConnection = () => {
  return (
    <>
    <TkRow className="justify-content-center">
        <TkCol>
          <TkCard>
            <TkCardBody>
              <TkForm>
                <TkRow className="g-3">
                  <TkCol lg={12}>
                    <TkInput
                      // {...register("clientName")}
                      id="integrationName"
                      type="text"
                      labelName="Integration Name"
                      placeholder="Enter integration name"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="url"
                      type="text"
                      labelName="URL"
                      placeholder="Enter URL"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="accountID"
                      type="text"
                      labelName="Account ID"
                      placeholder="Enter account id"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="consumerKey"
                      type="text"
                      labelName="Consumer Key"
                      placeholder="Enter consumer key"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="consumerSecretKey"
                      type="text"
                      labelName="Consumer Secret Key"
                      placeholder="Enter consumer secret key"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="accessToken"
                      type="text"
                      labelName="Access Token"
                      placeholder="Enter access token"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                  <TkCol lg={6}>
                    <TkInput
                      // {...register("clientName")}
                      id="accessSecretToken"
                      type="text"
                      labelName="Access Secret Token"
                      placeholder="Enter access secret token"
                      // requiredStarOnLabel={true}
                      // disabled={viewMode}
                    />
                  </TkCol>

                </TkRow>
                <div className="d-flex mt-4 space-childern"></div>
              </TkForm>
            </TkCardBody>
          </TkCard>
        </TkCol>
      </TkRow>
    </>
  )
}

export default NewConnection


