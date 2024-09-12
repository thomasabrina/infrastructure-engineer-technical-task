import { App, TerraformStack } from 'cdktf';
import { GoogleProvider } from '@cdktf/provider-google/google-provider'; 

class MyStack extends TerraformStack {
  constructor(app: App, id: string) {
    super(app, id);

    // Configure the Google provider
    new GoogleProvider(this, 'Google', {
      project: 'future-nuance-435407-c6',
      region: 'europe-north1', 
    });

    // Create a Cloud SQL instance
    const sqlInstance = new google_sql_database_instance(this, 'my-sql-instance', {
      name: 'my-sql-instance',
      databaseVersion: 'MYSQL_5_7', 
      region: 'europe-central2', 
      settings: {
        tier: 'db-f1-micro', 
        ipConfiguration: {
          authorizedNetworks: [
            {
              name: 'VPN Access 1',
              value: '10.26.32.12/32', 
            },
            {
              name: 'VPN Access 2',
              value: '19.104.105.29/32', 
            },
          ],
          ipv4Enabled: true,
        },
      },
    });

    // Create a database in the Cloud SQL instance
    new google_sql_database(this, 'my-database', {
      name: 'mydatabase', 
      instance: sqlInstance.name,
    });

    // Create a Cloud SQL user
    new google_sql_user(this, 'my-sql-user', {
      name: 'myuser', 
      instance: sqlInstance.name,
      password: 'mypassword', 
    });

    // Create a GKE cluster
    const cluster = new google_container_cluster(this, 'my-gke-cluster', {
      name: 'my-gke-cluster',
      location: 'eeurope-central2', 
      initialNodeCount: 1,
      nodeConfig: {
        machineType: 'e2-micro', // Choose a machine type based on your needs
      },
    });
  }
}

const app = new App();
new MyStack(app, 'my-infrastructure');
app.synth();
