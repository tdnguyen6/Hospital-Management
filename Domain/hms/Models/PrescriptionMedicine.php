<?php
require_once __DIR__."/Prescription.php";
require_once __DIR__."/Medicine.php";

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\TransactionRequiredException;

/**
 * @ORM\Entity
 */
class PrescriptionMedicine
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Prescription", inversedBy="prescriptionMedicines")
     * @ORM\JoinColumn(onDelete="cascade")
     */
    private $prescription;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Medicine", inversedBy="prescriptionMedicines")
     * @ORM\JoinColumn(onDelete="cascade")
     */
    private $medicine;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantity;

    /**
     * Get the value of prescription
     */
    public function getPrescription()
    {
        return $this->prescription;
    }

    /**
     * Set the value of prescription
     *
     * @param int $prescription
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setPrescription(int $prescription)
    {
        $PrescriptionObj = $this->entityManager->find('Prescription', $prescription);
        $this->prescription = $PrescriptionObj;

        return $this;
    }

    /**
     * Get the value of medicine
     */
    public function getMedicine()
    {
        return $this->medicine;
    }

    /**
     * Set the value of medicine
     *
     * @param int $medicine
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setMedicine(int $medicine)
    {
        $MedicineObj = $this->entityManager->find('Medicine', $medicine);
        $this->medicine = $MedicineObj;

        return $this;
    }

    /**
     * Get the value of quantity
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set the value of quantity
     *
     * @return  self
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function get () {
        return [
            "prescription" => $this->getPrescription()->getId(),
            "medicine" => $this->getMedicine()->getId(),
            "quantity" => $this->getQuantity()
        ];
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 3
            && array_key_exists("medicine", $fields)
            && array_key_exists("prescription", $fields)
            && array_key_exists("quantity", $fields)
            && $fields["medicine"] !== ""
            && $fields["prescription"] !== ""
            && $fields["quantity"] !== ""
        ) {
            return true;
        }
        return false;
    }
}