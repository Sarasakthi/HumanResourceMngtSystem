import React, { useState } from 'react'
import "./Services.css"

export const Services = () => {

    const [cloudClicked, setCloudClicked] = useState(true);
    const [appDevClicked, setAppDevClicked] = useState(false);
    const [analyticsClicked, setAnalyticsClicked] = useState(false);
    const [salesforceClicked, setSalesforceClicked] = useState(false);
    const [dynamicsClicked, setDynamicsClicked] = useState(false);
    const [sharePointClicked, setSharePointClicked] = useState(false);
    const [devOpsClicked, setDevOpsClicked] = useState(false);
    const [drupalClicked, setDrupalClicked] = useState(false);
    const [emergingTechClicked, setEmergingTechClicked] = useState(false);
    const [remoteAssetClicked, setRemoteAssetClicked] = useState(false);

    const showCloud = () => {
        setCloudClicked(true);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }

    const showAppDev = () => {
        setCloudClicked(false);
        setAppDevClicked(true);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }

    const showAnalytics = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(true);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showSalesforce = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(true);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showDynamics = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(true);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showSharePoint = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(true);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showDevOps = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(true);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showDrupal = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(true);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(false);
    }
    const showEmergingTech = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(true);
        setRemoteAssetClicked(false);
    }
    const showRemoteAsset = () => {
        setCloudClicked(false);
        setAppDevClicked(false);
        setAnalyticsClicked(false);
        setSalesforceClicked(false);
        setDynamicsClicked(false);
        setSharePointClicked(false);
        setDevOpsClicked(false);
        setDrupalClicked(false);
        setEmergingTechClicked(false);
        setRemoteAssetClicked(true);
    }

    var value = ">";
    return (
        <div className='serviceMain'>



            <div className="serviceslist">

                <div className="services">
                    <div className="row row-cols-3 mb-3 ">  {/*align-items-start */}

                        <div className="col-sm-4">
                            <div className='firstColumn'>
                                <div className={"cloud " + (cloudClicked ? "clicked" : "")} onClick={showCloud}><strong>Cloud </strong> 
                                { cloudClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"appDev " + (appDevClicked ? "clicked" : "")} onClick={showAppDev}><strong>Application Development</strong>
                                { appDevClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"analytics " + (analyticsClicked ? "clicked" : "")} onClick={showAnalytics}><strong>Analytics</strong>
                                { analyticsClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"salesforce " + (salesforceClicked ? "clicked" : "")} onClick={showSalesforce}><strong>Salesforce</strong>
                                { salesforceClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"dynamics " + (dynamicsClicked ? "clicked" : "")} onClick={showDynamics}><strong>Microsoft Dynamics</strong>
                                { dynamicsClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"sharePoint " + (sharePointClicked ? "clicked" : "")} onClick={showSharePoint}><strong>SharePoint</strong>
                                { sharePointClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"devOps " + (devOpsClicked ? "clicked" : "")} onClick={showDevOps}><strong>DevOps</strong>
                                { devOpsClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"drupal " + (drupalClicked ? "clicked" : "")} onClick={showDrupal}><strong>Drupal</strong>
                                { drupalClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"emergingTech " + (emergingTechClicked ? "clicked" : "")} onClick={showEmergingTech}><strong>Emerging Tech</strong>
                                { emergingTechClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                                <div className={"remoteAsset " + (remoteAssetClicked ? "clicked" : "")} onClick={showRemoteAsset}><strong>Remote Asset</strong>
                                { remoteAssetClicked && 
                                <span className='angleBracket'> {value} </span>}</div>
                            </div>

                        </div>
                        {cloudClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong> </div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Cloud Consulting
                                <hr></hr>
                                Cloud Development
                                <hr></hr>
                                Cloud Migration
                                <hr></hr>
                                Cloud Managed Services
                                <hr></hr>
                            </div>
                        }
                        {cloudClicked &&
                            <div className="col-sm-4">
                                <div className='thirdColumn'>
                                    <div className='platformColumn'><strong>Platforms</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Azure Consulting
                                <hr></hr>
                                AWS Consulting
                                <hr></hr>

                            </div>

                        }

                        {appDevClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Technologies</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                PowerApps
                                <hr></hr>
                                PHP
                                <hr></hr>
                                Angular
                                <hr></hr>
                                React
                                <hr></hr>
                                Vue
                                <hr></hr>
                                .NET
                                <hr></hr>
                                Java
                                <hr></hr>
                            </div>
                        }
                        {appDevClicked &&
                            <div className="col-sm-4">
                                <div className='thirdColumn'>
                                    <div className='platformColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Software Product Development
                                <hr></hr>
                                Offshore Software Development
                                <hr></hr>
                            </div>

                        }

                        {analyticsClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Business Intelligence
                                <hr></hr>
                                Data Science Consulting
                                <hr></hr>
                                Data Engineering
                                <hr></hr>
                                Big Data Analytics
                                <hr></hr>
                            </div>
                        }
                        {analyticsClicked &&
                            <div className="col-sm-4">
                                <div className='thirdColumn'>
                                    <div className='platformColumn'><strong>Platforms</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Power BI
                                <hr></hr>
                                Tableau
                                <hr></hr>
                            </div>

                        }
                        {salesforceClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Salesforce Consulting
                                <hr></hr>
                                Salesforce Implementation
                                <hr></hr>
                                Salesforce Development
                                <hr></hr>
                                Salesforce Customization
                                <hr></hr>
                                Salesforce Integration
                                <hr></hr>
                                Salesforce Outsourcing
                                <hr></hr>
                                Salesforce Managed Services
                                <hr></hr>
                            </div>
                        }
                        {salesforceClicked &&
                            <div className="col-sm-4">
                                <div className='thirdColumn'>
                                    <div className='platformColumn'><strong>Products</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Sales Cloud
                                <hr></hr>
                                Salesforce CPQ
                                <hr></hr>
                                Salesforce For Nonprofits
                                <hr></hr>
                                Tableau
                                <hr></hr>
                            </div>

                        }
                        {dynamicsClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Dynamics 365 Consulting
                                <hr></hr>
                                Dynamics 365 Implementation
                                <hr></hr>
                                Dynamics 365 Migration
                                <hr></hr>

                            </div>
                        }
                        {dynamicsClicked &&
                            <div className="col-sm-4">
                                <div className='thirdColumn'>
                                    <div className='platformColumn'><strong>Products</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Dynamics CRM
                                <hr></hr>
                                Business Central
                                <hr></hr>
                                Dynamics SL
                                <hr></hr>
                                Dynamics GP
                                <hr></hr>
                                For Nonprofits
                                <hr></hr>
                            </div>

                        }
                        {sharePointClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                SharePoint Consulting
                                <hr></hr>
                                SharePoint Implementation
                                <hr></hr>
                                SharePoint Support
                                <hr></hr>
                                SharePoint Migration & Upgrade
                                <hr></hr>
                                SharePoint Healthcare
                                <hr></hr>
                            </div>
                        }

                        {devOpsClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Devops Consulting
                                <hr></hr>
                                Azure Devops
                                <hr></hr>

                            </div>
                        }

                        {drupalClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>

                                Drupal Development
                                <hr></hr>
                                Drupal Migration
                                <hr></hr>

                            </div>
                        }

                        {emergingTechClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                IoT
                                <hr></hr>
                                Artificial Intelligence
                                <hr></hr>
                                Blockchain
                                <hr></hr>
                            </div>
                        }

                        {remoteAssetClicked &&

                            <div className="col-sm-4">
                                <div className='secondColumn'>
                                    <div className='serviceColumn'><strong>Services</strong></div>
                                    <div className='lineUnderService'><hr></hr></div>
                                </div>
                                <br></br>


                                Remote Asset Monitoring
                                <hr></hr>

                            </div>
                        }



                    </div>






                </div>
            </div>
        </div>
    )
}
